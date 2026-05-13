import { Pressable, Text, ActivityIndicator } from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline';
  loading?: boolean;
}

export default function AuthButton({ title, onPress, variant = 'primary', loading }: AuthButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      className={
        isPrimary
          ? 'bg-brand-orange py-4 rounded-full items-center justify-center'
          : 'border-2 border-brand-orange bg-transparent py-4 rounded-full items-center justify-center'
      }
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#fff' : '#F7941D'} />
      ) : (
        <Text
          className={
            isPrimary
              ? 'text-white text-base font-bold'
              : 'text-brand-orange text-base font-bold'
          }
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
