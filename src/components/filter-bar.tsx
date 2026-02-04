'use client';

import { TextInput, Group } from '@mantine/core';

interface IFilterBarProps {
  searchQuery: string;
  cityFilter: string;
  onSearchChange: (val: string) => void;
  onCityChange: (val: string) => void;
}

/**
 * FilterBar Component
 * * Responsibility:
 * - Purely presentational component.
 * - Receives current values and change handlers from the parent (UserList).
 * - Implements the "Lifting State Up" pattern implicitly (state lives in parent).
 */

const FilterBar = ({
  searchQuery,
  cityFilter,
  onSearchChange,
  onCityChange,
}: IFilterBarProps) => {
  return (
    <Group mb="lg" grow>
      <TextInput
        label="Search by Name"
        placeholder="Search name..."
        value={searchQuery}
        onChange={event => onSearchChange(event.currentTarget.value)}
      />

      <TextInput
        label="Filter by City"
        placeholder="Search city..."
        value={cityFilter}
        onChange={event => onCityChange(event.currentTarget.value)}
      />
    </Group>
  );
};

export default FilterBar;
