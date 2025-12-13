import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { APP_VERSION, CONFIG } from '../config/constants';
import { ChevronRight, Shield, FileText } from 'lucide-react-native';

export default function AboutScreen() {
    const { t, colors } = useApp();

    const openLink = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(t('error'), 'Cannot open this URL');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header / Logo Area */}
                <View style={styles.logoContainer}>
                    <Text style={[styles.appName, { color: colors.primary }]}>WorthIt</Text>
                    <Text style={[styles.version, { color: colors.subText }]}>{t('version')} {APP_VERSION}</Text>
                </View>

                {/* Legal Links */}
                <View style={[styles.section, { backgroundColor: colors.card }]}>
                    <TouchableOpacity style={[styles.row, { borderBottomColor: colors.border }]} onPress={() => openLink(CONFIG.PRIVACY_POLICY_URL)}>
                        <View style={styles.rowLeft}>
                            <Shield size={20} color={colors.text} />
                            <Text style={[styles.linkText, { color: colors.text }]}>{t('privacy_policy')}</Text>
                        </View>
                        <ChevronRight size={20} color={colors.subText} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row} onPress={() => openLink(CONFIG.TERMS_OF_SERVICE_URL)}>
                        <View style={styles.rowLeft}>
                            <FileText size={20} color={colors.text} />
                            <Text style={[styles.linkText, { color: colors.text }]}>{t('terms_of_service')}</Text>
                        </View>
                        <ChevronRight size={20} color={colors.subText} />
                    </TouchableOpacity>
                </View>

                {/* Copyright */}
                <View style={styles.footer}>
                    <Text style={[styles.copyright, { color: colors.subText }]}>{t('copyright_notice')}</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        flexGrow: 1,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 40,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    version: {
        fontSize: 16,
    },
    section: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'transparent', // Overridden in render
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    linkText: {
        fontSize: 16,
    },
    footer: {
        marginTop: 'auto',
        alignItems: 'center',
        paddingBottom: 20,
    },
    copyright: {
        fontSize: 12,
        textAlign: 'center',
    }
});
