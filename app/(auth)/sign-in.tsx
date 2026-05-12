import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import Logo from '@/components/auth/Logo';
import OrDivider from '@/components/auth/OrDivider';
import SocialButton from '@/components/auth/SocialButton';

export default function SignInScreen() {
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
              Welcome...
            </Text>
            <Text className="text-gray-400 text-center mt-1 mb-8">
              Sign in to continue
            </Text>

            {/* Input fields */}
            <AuthInput icon="email-outline" placeholder="Your Email" keyboardType="email-address" autoCapitalize="none" />
            <AuthInput icon="lock-outline" placeholder="Password" secureTextEntry />

            {/* Sign In button */}
            <View className="mt-6">
              <AuthButton title="Sign In" onPress={() => router.replace('/(home)')} />
            </View>

            {/* OR divider */}
            <OrDivider />

            {/* Social login */}
            <SocialButton provider="google" onPress={() => {}} />
            <SocialButton provider="facebook" onPress={() => {}} />

            {/* Forgot password */}
            <Text className="text-brand-orange text-center font-semibold mt-5" onPress={() => router.push('/(auth)/forgot-pwd')}>
              Forgot Password?
            </Text>

            {/* Register link */}
            <Text className="text-center mt-4 text-gray-500">
              Don't have a account?{' '}
              <Text
                className="text-brand-orange font-bold"
                onPress={() => router.back()}
              >
                Register
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
