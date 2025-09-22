import React from "react";
import Typography from "../TypographyComponent";
import Image from "../Image";

type ProfileProps = {
  name: string;
  role: string;
  avatarUrl: string;
  style?: React.CSSProperties;
  className?: string;
};

const Profile = ({ name, role, avatarUrl, ...props }: ProfileProps) => {
  return (
    <Typography variant="div" {...props}>
      <Image src={avatarUrl} alt={`${name}'s avatar`} className={"img"} />
      <Typography variant="h3">{name}</Typography>
      <Typography variant="p">{role}</Typography>
    </Typography>
  );
};

export default Profile;
