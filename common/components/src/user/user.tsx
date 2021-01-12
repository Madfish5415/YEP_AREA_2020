import React, { User } from "@area-common/types";
import { FC } from "react";
import {Avatar, Tooltip} from "antd";
import { UserOutlined } from "@ant-design/icons";

type Props = {
  user: User;
};

export const UserComponent: FC<Props> = (props) => {
  return (
    <div>
      <Tooltip title={`${props.user.firstName} ${props.user.lastName}`}>
        <Avatar size={128} icon={<UserOutlined />} />
      </Tooltip>
    </div>
  );
};
