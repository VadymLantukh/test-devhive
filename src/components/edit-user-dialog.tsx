'use client';

import { useForm, Controller } from 'react-hook-form';

import { Modal, TextInput, Button, Group, Stack } from '@mantine/core';

import { IUser, IUserFormValues } from '@/types/types';
import { PATTERN_EMAIL } from '@/lib/constants';

interface IEditUserDialogProps {
  open: boolean;
  user: IUser | null;
  onClose: () => void;
  onSubmit: (data: IUserFormValues) => void;
  isPending: boolean;
}

/**
 * EditUserDialog Component
 * * Responsibility:
 * - Manages the form state and validation logic.
 * - Renders the Modal UI.
 * * Hooks & Patterns:
 * - React Hook Form: Used to handle form state, validation, and submission efficiently
 * without causing re-renders on every keystroke.
 * - 'values' prop: We use RHF's `values` prop to sync the form with the `user` prop.
 * This automatically resets the form when the `user` data changes, removing the
 * need for a manual `useEffect` to sync props to state.
 */

export default function EditUserDialog({
  open,
  user,
  onClose,
  onSubmit,
  isPending,
}: IEditUserDialogProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFormValues>({
    values: user
      ? {
          name: user.name,
          email: user.email,
          city: user.address.city,
        }
      : {
          name: '',
          email: '',
          city: '',
        },
  });

  return (
    <Modal opened={open} onClose={onClose} title="Edit User" centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Name"
                error={errors.name?.message}
                withAsterisk
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: PATTERN_EMAIL,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Email"
                error={errors.email?.message}
                withAsterisk
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            rules={{ required: 'City is required' }}
            render={({ field }) => (
              <TextInput
                {...field}
                label="City"
                error={errors.city?.message}
                withAsterisk
              />
            )}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Save Changes
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
