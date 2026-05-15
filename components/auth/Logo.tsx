import { Text } from 'react-native';

interface LogoProps {
  size?: 'default' | 'large';
}

export default function Logo({ size = 'default' }: LogoProps) {
  const textClass = size === 'large' ? 'text-5xl' : 'text-4xl';

  return (
    <Text className={`${textClass} font-extrabold`}>
      <Text className="text-gray-900">Supa</Text>
      <Text className="text-white">Menu</Text>
    </Text>
  );
}
