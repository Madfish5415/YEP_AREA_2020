import React from "@area-common/types";
import { FC } from "react";
import { Avatar, Tooltip } from "antd";
import { ExclamationOutlined } from "@ant-design/icons";

type Props = {
  message: string;
};

export const ErrorComponent: FC<Props> = (props) => {
  return (
    <div>
      <Tooltip title={`${props.message}`}>
        <Avatar size={128} icon={<ExclamationOutlined />} />
      </Tooltip>
    </div>
  );
};
