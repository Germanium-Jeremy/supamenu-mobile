import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import Logo from '@/components/auth/Logo';

export default function ForgotPwdScreen() {
    return (
        <View className="flex-1 bg-brand-orange">
            <StatusBar style="light" />

            {/* Header with logo */}
            <View className="items-center pt-32 pb-10">
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
                    <View className="px-8 pt-10 pb-16">
                        {/* Welcome text */}
                        <Text className="text-xl font-bold text-gray-900 text-center">Forgot password</Text>

                        <Text className="text-gray-400 text-center mt-2 mb-10">Enter your email to receive code.</Text>

                        {/* Input fields */}
                        <AuthInput icon="email-outline" placeholder="Your Email" keyboardType="email-address" autoCapitalize="none" />

                        {/* Sign In button */}
                        <View className="mt-10">
                            <AuthButton title="Get Code" onPress={() => {}} />
                        </View>

                        {/* Register link */}
                        <Text className="text-center mt-6 text-gray-500">
                            Remembered your password{'? '}
                            <Text
                                className="text-brand-orange font-bold"
                                onPress={() => router.back()}
                            >
                                Login
                            </Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
