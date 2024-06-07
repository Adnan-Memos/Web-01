import React from "react";
import { Avatar, Menu } from "@mantine/core";

const ProfileMenu = ({ user, logout }) => {
  return (
      <Menu>
        <Menu.Target>
          <Avatar src={user?.picture} alt="user image" radius={"x1"} />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Favorites</Menu.Item>
        </Menu.Dropdown>
      </Menu>
  );
};

export default ProfileMenu;
