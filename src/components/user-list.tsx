'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebouncedValue } from '@mantine/hooks';

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Loader,
  Alert,
  Center,
} from '@mantine/core';
import FilterBar from '@/components/filter-bar';
import EditUserDialog from '@/components/edit-user-dialog';
import UserCard from '@/components/user-card';

import { IUser, IUserFormValues } from '@/types/types';
import { queryUpdateUser, queryUsers } from '@/service/queries';

import { TIME_DEBOUNCED } from '@/lib/constants';

/**
 * UserList Component
 * * Responsibility:
 * - Acts as the Container/Smart Component.
 * - Manages application state: Data fetching, Filtering state, Modal visibility.
 * - orchestrates data flow between the API service and UI components.
 * * Next.js Decision:
 * - Marked as 'use client' because it relies on React hooks (useState) and
 * browser-only interaction (filtering, modals).
 */

const UserList = () => {
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const [debouncedSearch] = useDebouncedValue(searchQuery, TIME_DEBOUNCED);
  const [debouncedCity] = useDebouncedValue(cityFilter, TIME_DEBOUNCED);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: queryUsers,
  });

  const mutation = useMutation({
    mutationFn: queryUpdateUser,
    onSuccess: updatedUser => {
      queryClient.setQueryData<IUser[]>(['users'], oldUsers => {
        return (
          oldUsers?.map(user =>
            user.id === updatedUser.id ? updatedUser : user
          ) || []
        );
      });

      setEditingUser(null);
    },
  });

  const filteredUsers = users.filter(user => {
    const matchName = user.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchCity = user.address.city
      .toLowerCase()
      .includes(debouncedCity.toLowerCase());
    return matchName && matchCity;
  });

  const handleEditSubmit = (formData: IUserFormValues) => {
    if (!editingUser) return;

    mutation.mutate({
      ...editingUser,
      name: formData.name,
      email: formData.email,
      address: { ...editingUser.address, city: formData.city },
    });
  };

  if (isLoading)
    return (
      <Center h={200}>
        <Loader />
      </Center>
    );

  if (isError) return <Alert color="red">Failed to load users</Alert>;

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xs">
        User Management
      </Title>
      <Text c="dimmed" mb="xl">
        Manage users efficiently with Mantine UI.
      </Text>

      <FilterBar
        searchQuery={searchQuery}
        cityFilter={cityFilter}
        onSearchChange={setSearchQuery}
        onCityChange={setCityFilter}
      />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} onEdit={setEditingUser} />
        ))}
      </SimpleGrid>

      <EditUserDialog
        open={!!editingUser}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSubmit={handleEditSubmit}
        isPending={mutation.isPending}
      />
    </Container>
  );
};

export default UserList;
