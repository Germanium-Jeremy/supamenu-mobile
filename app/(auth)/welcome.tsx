import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import Logo from '@/components/auth/Logo';
import OrDivider from '@/components/auth/OrDivider';
import SocialButton from '@/components/auth/SocialButton';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-brand-orange">
      <StatusBar style="light" />

      {/* Header with logo */}
      <View className="items-center pt-16 pb-8">
        <Logo size="large" />
      </View>

      {/* White card */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1 bg-white rounded-t-[30px]"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-8 pt-8 pb-12">
            {/* Welcome text */}
            <Text className="text-xl font-bold text-gray-900 text-center">
              Welcome ...
            </Text>
            <Text className="text-gray-400 text-center mt-1 mb-8">
              Please fill in the information
            </Text>

            {/* Input fields */}
            <AuthInput icon="account-outline" placeholder="Full Name" />
            <AuthInput icon="phone-outline" placeholder="Phone Number" keyboardType="phone-pad" />
            <AuthInput icon="email-outline" placeholder="Your Email" keyboardType="email-address" autoCapitalize="none" />
            <AuthInput icon="key" placeholder="Your Password" />

            {/* Proceed button */}
            <View className="mt-6">
              <AuthButton title="Proceed" onPress={() => router.replace('/(home)')} />
            </View>

            {/* OR divider */}
            <OrDivider />

            {/* Social login */}
            <SocialButton provider="google" onPress={() => {}} />
            <SocialButton provider="facebook" onPress={() => {}} />

            {/* Register link */}
            <Text className="text-center mt-5 text-gray-500">
              Have a account?{' '}
              <Text className="text-brand-orange font-bold" onPress={() => router.push('/(auth)/sign-in')}>Login</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
