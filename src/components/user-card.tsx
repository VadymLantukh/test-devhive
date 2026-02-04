'use client';

import { Card, Text, Button } from '@mantine/core';
import { IUser } from '@/types/types';

interface IUserCardProps {
  user: IUser;
  onEdit: (user: IUser) => void;
}

/**
 * UserCard Component
 * * Responsibility:
 * - Purely presentational component.
 * - Displays user details in a card layout.
 * - Triggers the 'onEdit' callback when the button is clicked.
 * * Performance:
 * - Since this is a simple component, React.memo is not strictly necessary unless
 * the list is huge (1000+ items), but extracting it makes the parent render logic cleaner.
 */

const UserCard = ({ user, onEdit }: IUserCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={500} size="lg">
        {user.name}
      </Text>

      <Text size="sm" c="dimmed" mt={5}>
        {user.email}
      </Text>

      <Text size="xs" c="dimmed" mt="xs" mb="md">
        {user.address.city}
      </Text>

      <Button variant="light" fullWidth onClick={() => onEdit(user)}>
        Edit Profile
      </Button>
    </Card>
  );
};

export default UserCard;
