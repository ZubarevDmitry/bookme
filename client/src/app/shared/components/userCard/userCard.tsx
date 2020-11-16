import React from 'react';
import { Card, Image } from 'semantic-ui-react';

interface Props { 
  avatarUrl: string;
  name: string;
  description: string;
}

const UserCard: React.FC<Props> = ({avatarUrl, name, description }) => {
  const placeholderInfo = {
    avatarUrl: 'https://simpleicon.com/wp-content/uploads/account.png',
  };

  return (
    <Card>
      <Image src={avatarUrl || placeholderInfo.avatarUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default UserCard;
