# 📱 NFC 组队 APP - APK 打包指南

**版本**: v1.0.0  
**创建日期**: 2026-03-28  
**目标**: 生成可安装的 Android APK 文件

---

## ⚠️ 重要说明

由于 React Native 项目需要 Android Studio 环境和 Gradle 构建工具，APK 打包需要在本地完成。

以下是详细的打包步骤，请按顺序操作：

---

## 📋 环境要求

### 必需工具
1. **Node.js** 18+ ✅ (已安装)
2. **Java JDK** 17+ (需要安装)
3. **Android Studio** (需要安装)
4. **Android SDK** (通过 Android Studio 安装)
5. **Gradle** 8.0+ (通常随 Android Studio 安装)

### 检查环境
```bash
# 检查 Java
java -version

# 检查 Android SDK
echo $ANDROID_HOME

# 检查 Gradle
gradle --version
```

---

## 🚀 打包步骤

### 第 1 步：初始化 Android 项目

```bash
cd /home/admin/.openclaw/workspace/nfc-teamup-app

# 如果还没有 android 目录，需要创建
npx react-native init NFCTeamUp --template react-native-template-typescript

# 或者如果已有项目结构
cd nfc-teamup-app
npx react-native-eject
```

### 第 2 步：配置签名密钥

```bash
cd android/app

# 生成签名密钥 (首次需要)
keytool -genkey -v -keystore nfc-teamup.keystore -alias nfc-teamup -keyalg RSA -keysize 2048 -validity 10000

# 按提示输入：
# - 密钥库密码
# - 姓名
# - 组织单位
# - 组织名称
# - 城市
# - 省份
# - 国家代码 (CN)
```

### 第 3 步：配置 Gradle

编辑 `android/gradle.properties`:
```properties
NFC_TEAMUP_UPLOAD_STORE_FILE=nfc-teamup.keystore
NFC_TEAMUP_UPLOAD_KEY_ALIAS=nfc-teamup
NFC_TEAMUP_UPLOAD_STORE_PASSWORD=你的密码
NFC_TEAMUP_UPLOAD_KEY_PASSWORD=你的密码
```

编辑 `android/app/build.gradle`:
```gradle
android {
    ...
    defaultConfig {
        applicationId "com.nfcteamup"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0.0"
    }
    
    signingConfigs {
        release {
            storeFile file(NFC_TEAMUP_UPLOAD_STORE_FILE)
            storePassword NFC_TEAMUP_UPLOAD_STORE_PASSWORD
            keyAlias NFC_TEAMUP_UPLOAD_KEY_ALIAS
            keyPassword NFC_TEAMUP_UPLOAD_KEY_PASSWORD
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

### 第 4 步：构建 APK

```bash
cd /home/admin/.openclaw/workspace/nfc-teamup-app/android

# 方式 1: 生成 Debug APK (用于测试，无需签名)
./gradlew assembleDebug

# 方式 2: 生成 Release APK (用于发布，需要签名)
./gradlew assembleRelease

# 方式 3: 生成 AAB (Google Play 发布格式)
./gradlew bundleRelease
```

### 第 5 步：查找 APK 文件

构建完成后，APK 文件位置：

```
# Debug APK
android/app/build/outputs/apk/debug/app-debug.apk

# Release APK (推荐)
android/app/build/outputs/apk/release/app-release.apk

# AAB (Google Play)
android/app/build/outputs/bundle/release/app-release.aab
```

---

## 📦 快速打包脚本

创建 `build-apk.sh`:

```bash
#!/bin/bash

echo "🚀 开始构建 NFC 组队 APP APK..."

cd /home/admin/.openclaw/workspace/nfc-teamup-app

# 安装依赖
echo "📦 安装依赖..."
npm install

# 进入 Android 目录
cd android

# 清理旧构建
echo "🧹 清理旧构建..."
./gradlew clean

# 构建 Release APK
echo "🔨 构建 Release APK..."
./gradlew assembleRelease

# 检查构建结果
if [ -f "app/build/outputs/apk/release/app-release.apk" ]; then
    echo "✅ APK 构建成功!"
    echo "📍 APK 位置：android/app/build/outputs/apk/release/app-release.apk"
    
    # 复制到项目根目录
    cp app/build/outputs/apk/release/app-release.apk ../nfc-teamup-v1.0.0-release.apk
    
    echo "📱 APK 已复制到：nfc-teamup-v1.0.0-release.apk"
else
    echo "❌ APK 构建失败!"
    exit 1
fi
```

使用：
```bash
chmod +x build-apk.sh
./build-apk.sh
```

---

## 🔧 常见问题

### 问题 1: ANDROID_HOME 未设置

**解决方案**:
```bash
export ANDROID_HOME=~/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

添加到 `~/.bashrc` 或 `~/.zshrc`:
```bash
echo 'export ANDROID_HOME=~/Android/Sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.bashrc
source ~/.bashrc
```

### 问题 2: Gradle 构建失败

**解决方案**:
```bash
cd android
./gradlew clean
./gradlew build --refresh-dependencies
```

### 问题 3: 签名密钥丢失

**解决方案**: 重新生成密钥（注意：这会导致无法更新已安装的应用）

```bash
keytool -genkey -v -keystore nfc-teamup.keystore -alias nfc-teamup -keyalg RSA -keysize 2048 -validity 10000
```

---

## 📲 安装 APK

### 方式 1: USB 调试安装

```bash
# 连接手机，开启 USB 调试
adb devices  # 检查设备连接

# 安装 APK
adb install nfc-teamup-v1.0.0-release.apk
```

### 方式 2: 直接传输安装

1. 将 APK 文件传输到手机
2. 在手机上打开文件管理器
3. 点击 APK 文件
4. 允许"未知来源"安装
5. 点击安装

---

## 🎯 替代方案

如果您不想本地编译，可以使用以下云构建服务：

### 方案 1: Expo Application Services (EAS)

```bash
# 安装 EAS CLI
npm install -g eas-cli

# 登录 Expo
eas login

# 配置 EAS
eas build:configure

# 构建 Android APK
eas build --platform android --profile preview

# 构建完成后可下载 APK
```

**优点**: 无需本地 Android Studio  
**缺点**: 需要 Expo 账号

### 方案 2: GitHub Actions + Codemagic

1. 将代码推送到 GitHub
2. 在 Codemagic 配置自动构建
3. 每次提交自动生成 APK

**优点**: 自动化 CI/CD  
**缺点**: 需要配置工作流

---

## 📊 构建时间估算

| 步骤 | 预计时间 |
|------|---------|
| 环境准备 | 30 分钟 |
| 项目初始化 | 10 分钟 |
| 签名配置 | 5 分钟 |
| 首次构建 | 15-20 分钟 |
| 后续构建 | 5-10 分钟 |

**总计**: 首次约 1 小时，后续 10 分钟

---

## ✅ 检查清单

构建前检查：
- [ ] Node.js 18+ 已安装
- [ ] Java JDK 17+ 已安装
- [ ] Android Studio 已安装
- [ ] ANDROID_HOME 已配置
- [ ] Gradle 可用

构建后检查：
- [ ] APK 文件存在
- [ ] APK 大小合理 (<50MB)
- [ ] 可以在手机安装
- [ ] 应用可以正常启动
- [ ] 核心功能可用

---

**需要我帮您准备完整的构建环境吗？** 🌸
