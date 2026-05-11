import { Pressable, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CategoryChipProps {
  name: string;
  icon: string;
  active?: boolean;
  onPress?: () => void;
}

export default function CategoryChip({ name, icon, active = false, onPress }: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={
        active
          ? 'flex-row items-center bg-brand-orange px-5 py-2.5 rounded-full mr-3'
          : 'flex-row items-center bg-gray-100 px-5 py-2.5 rounded-full mr-3'
      }
    >
      <MaterialCommunityIcons
        name={icon as any}
        size={18}
        color={active ? '#fff' : '#6b7280'}
      />
      <Text
        className={
          active
            ? 'text-white font-semibold text-sm ml-2'
            : 'text-gray-500 font-semibold text-sm ml-2'
        }
      >
        {name}
      </Text>
    </Pressable>
  );
}
