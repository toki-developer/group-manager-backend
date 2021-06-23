import { MembershipModel } from './../models/membership.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addGroupByUserDto, AddUserDto } from 'src/dto/user.dto';
import { GroupModel } from 'src/models/group.model';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
    @InjectRepository(GroupModel)
    private groupRepository: Repository<GroupModel>,
  ) {}

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (user == undefined) {
      const addUserDto = {
        id: id,
        name: '',
        iconUrl: '',
      };
      const newUser = this.userRepository.save(addUserDto);
      return newUser;
    }
    return user;
  }

  async save(user: AddUserDto) {
    return await this.userRepository.save(user);
  }

  async addGroupByUser(affiliation: addGroupByUserDto) {
    const user = await this.userRepository.findOne({
      relations: ['membership', 'membership.group'],
      where: { id: affiliation.userId },
    });
    // ユーザにグループがない時に{null,null}のデータが作られるので削除
    if (!user.membership[0].group) {
      user.membership.shift();
    }

    // 既にグループに所属してる時:エラー、stateFlgが2の時、0にする
    user.membership.map((membership, key) => {
      if (membership.group?.id == affiliation.groupId) {
        if (membership.stateFlg == 2) {
          user.membership[key].stateFlg = 0;
        } else {
          throw 'error：Already exists';
        }
      }
    });
    const group = await this.groupRepository.findOne(affiliation.groupId);
    const membership: MembershipModel = {
      stateFlg: affiliation.stateFlg,
      user,
      group,
    };
    user.membership.push(membership);
    return await this.userRepository.save(user);
  }

  async deleteGroupByUser(userId: string, groupId: number) {
    const user = await this.userRepository.findOne({
      relations: ['membership', 'membership.group'],
      where: { id: userId },
    });
    let deleteGroup: MembershipModel;
    user.membership.map((membership, key) => {
      if (membership.group.id == groupId) {
        deleteGroup = membership;
        user.membership[key].stateFlg = 2;
      }
    });
    await this.userRepository.save(user);
    return deleteGroup.group;
  }

  async findGroupByUser(id: string): Promise<MembershipModel[] | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.membership', 'membership')
      .leftJoinAndSelect('membership.group', 'group')
      .where('user.id = :id', { id })
      .andWhere('membership.stateFlg != 2')
      .orderBy('membership.stateFlg', 'DESC')
      .getOne();
    return user.membership;
  }

  async findUserByGroup(id: number): Promise<MembershipModel[] | null> {
    const group = await this.groupRepository.findOne({
      relations: ['membership', 'membership.user'],
      where: { id },
    });
    return group.membership;
  }
}
