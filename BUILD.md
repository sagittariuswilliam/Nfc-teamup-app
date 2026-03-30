# NFC TeamUp 打包发布文档

**文档版本**: v1.0  
**更新日期**: 2026-03-28  
**适用平台**: iOS / Android  
**React Native 版本**: 0.73+

---

## 📋 目录

1. [环境准备](#环境准备)
2. [iOS 打包步骤](#ios-打包步骤)
3. [Android 打包步骤](#android-打包步骤)
4. [常见问题](#常见问题)
5. [发布检查清单](#发布检查清单)

---

## 🔧 环境准备

### 系统要求

| 平台 | 最低要求 | 推荐配置 |
|-----|---------|---------|
| macOS | 12.0+ | 14.0+ (iOS 开发必需) |
| Windows | 10+ | 11+ (仅 Android) |
| Linux | Ubuntu 20.04+ | Ubuntu 22.04+ (仅 Android) |

### 开发工具

#### 必需工具
- **Node.js**: >= 18.x (推荐 20.x)
- **npm**: >= 9.x 或 **yarn**: >= 1.22.x
- **Git**: >= 2.x

#### iOS 开发 (仅 macOS)
- **Xcode**: >= 15.0
- **CocoaPods**: >= 1.14.x
- **iOS Simulator**: iOS 16+

#### Android 开发
- **Android Studio**: Hedgehog (2023.1.1) 或更新
- **JDK**: >= 17.x
- **Android SDK**: API Level 26+
- **Android NDK**: 25.x (如需要)

### 环境验证

```bash
# 检查 Node.js
node --version  # 应 >= 18.x

# 检查 npm/yarn
npm --version   # 应 >= 9.x
# 或
yarn --version  # 应 >= 1.22.x

# 检查 Git
git --version

# 检查 iOS 环境 (macOS)
xcodebuild -version
pod --version

# 检查 Android 环境
adb --version
javac -version
```

---

## 📱 iOS 打包步骤

### 步骤 1: 安装依赖

```bash
# 进入项目目录
cd nfc-teamup-app

# 安装 npm 依赖
npm install

# 安装 iOS CocoaPods 依赖
cd ios
pod install
cd ..
```

### 步骤 2: 配置证书和描述文件

#### 2.1 创建 App ID
1. 登录 [Apple Developer](https://developer.apple.com/)
2. 进入 Certificates, IDs & Profiles
3. 创建新的 App ID
   - Bundle ID: `com.nfcteamup.app`
   - 启用所需 Capabilities (Push Notifications, etc.)

#### 2.2 创建证书
1. 在 Certificates, IDs & Profiles 中创建证书
2. 选择 "Apple Distribution" (发布) 或 "Apple Development" (开发)
3. 下载并双击安装到钥匙串

#### 2.3 创建描述文件
1. 创建 Provisioning Profile
2. 选择类型：App Store (发布) 或 Development (开发)
3. 选择 App ID
4. 添加证书和设备
5. 下载并命名：`NFC_TeamUp_AppStore.mobileprovision`

### 步骤 3: 配置 Xcode 项目

#### 3.1 打开项目
```bash
# 使用 Xcode 打开 workspace
open ios/NFCTeamUp.xcworkspace
```

#### 3.2 配置 Signing
1. 选择项目 → NFCTeamUp → Target → Signing & Capabilities
2. 选择 Team (你的开发者账号)
3. Bundle Identifier: `com.nfcteamup.app`
4. Signing Certificate: 选择安装的证书
5. Provisioning Profile: 自动或手动选择

#### 3.3 配置版本号
1. 在 `ios/NFCTeamUp/Info.plist` 中修改:
   - `CFBundleShortVersionString`: 版本号 (如 1.0.0)
   - `CFBundleVersion`: 构建号 (如 1)

2. 或在 `package.json` 中修改后同步:
```json
{
  "version": "1.0.0"
}
```

#### 3.4 配置启动图标和启动屏
1. 使用 `react-native-bootsplash` 生成启动屏
2. 在 Assets.xcassets 中配置 App Icon
3. 确保提供所有尺寸的图标

### 步骤 4: 构建 Archive

#### 4.1 选择真机配置
1. 在 Xcode 顶部选择 "Any iOS Device (arm64)"
2. 或选择具体的真机设备

#### 4.2 构建 Archive
1. 菜单: Product → Archive
2. 等待构建完成 (约 5-10 分钟)
3. Archives 窗口自动打开

### 步骤 5: 上传到 App Store Connect

#### 5.1 验证 Archive
1. 在 Archives 窗口选择刚创建的 Archive
2. 点击 "Validate App"
3. 按照向导完成验证

#### 5.2 上传 Archive
1. 点击 "Distribute App"
2. 选择 "App Store Connect"
3. 选择 "Upload"
4. 按照向导完成上传

#### 5.3 或使用命令行
```bash
# 导出 IPA
xcodebuild -exportArchive \
  -archivePath build/NFCTeamUp.xcarchive \
  -exportPath build \
  -exportOptionsPlist exportOptions.plist

# 使用 altool 上传 (旧版)
xcrun altool --upload-app \
  -type ios \
  -file build/NFCTeamUp.ipa \
  -apiKey your_api_key \
  -apiIssuer your_issuer_id

# 或使用 notarytool (新版)
xcrun notarytool submit build/NFCTeamUp.ipa \
  --apple-id your@apple.com \
  --password app-specific-password \
  --team-id TEAM_ID
```

### 步骤 6: 在 App Store Connect 发布

1. 登录 [App Store Connect](https://appstoreconnect.apple.com/)
2. 选择 "我的 App" → NFC TeamUp
3. 选择新版本 (1.0.0)
4. 填写版本信息:
   - 版本说明
   - 隐私政策 URL
   - 支持 URL
   - 截图 (6.7", 6.5", 5.5", 12.9", 11")
5. 提交审核

### iOS 打包快速命令

```bash
# 完整打包流程
cd nfc-teamup-app
npm install
cd ios && pod install && cd ..

# 清理构建缓存
cd ios
xcodebuild clean
cd ..

# 构建 Release
xcodebuild \
  -workspace ios/NFCTeamUp.xcworkspace \
  -scheme NFCTeamUp \
  -configuration Release \
  -archivePath build/NFCTeamUp.xcarchive \
  archive

# 导出 IPA
xcodebuild \
  -exportArchive \
  -archivePath build/NFCTeamUp.xcarchive \
  -exportPath build \
  -exportOptionsPlist ios/exportOptions.plist
```

---

## 🤖 Android 打包步骤

### 步骤 1: 安装依赖

```bash
# 进入项目目录
cd nfc-teamup-app

# 安装 npm 依赖
npm install
```

### 步骤 2: 配置签名密钥

#### 2.1 生成密钥库
```bash
# 生成 release 密钥库
keytool -genkeypair -v \
  -keystore nfcteamup-release.keystore \
  -alias nfcteamup \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# 按提示输入:
# - 密钥库口令
# - 姓名
# - 组织单位
# - 组织
# - 城市
# - 省份
# - 国家代码
```

#### 2.2 配置 gradle.properties
在 `android/gradle.properties` 中添加:
```properties
NFC_TEAMUP_UPLOAD_STORE_FILE=nfcteamup-release.keystore
NFC_TEAMUP_UPLOAD_KEY_ALIAS=nfcteamup
NFC_TEAMUP_UPLOAD_STORE_PASSWORD=你的密钥库密码
NFC_TEAMUP_UPLOAD_KEY_PASSWORD=你的密钥密码
```

**⚠️ 注意**: 不要将 gradle.properties 提交到 Git!

#### 2.3 配置 build.gradle
编辑 `android/app/build.gradle`:
```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('NFC_TEAMUP_UPLOAD_STORE_FILE')) {
                storeFile file(NFC_TEAMUP_UPLOAD_STORE_FILE)
                storePassword NFC_TEAMUP_UPLOAD_STORE_PASSWORD
                keyAlias NFC_TEAMUP_UPLOAD_KEY_ALIAS
                keyPassword NFC_TEAMUP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 步骤 3: 配置应用信息

#### 3.1 修改包名
编辑 `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        applicationId "com.nfcteamup.app"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0.0"
    }
}
```

#### 3.2 修改应用名称
编辑 `android/app/src/main/res/values/strings.xml`:
```xml
<resources>
    <string name="app_name">碰一碰组队</string>
</resources>
```

#### 3.3 配置启动图标
1. 准备 512x512 的应用图标
2. 使用 Android Studio 生成多分辨率图标
3. 或使用 `react-native-bootsplash` 工具

### 步骤 4: 构建 Release APK/AAB

#### 4.1 清理项目
```bash
cd android
./gradlew clean
cd ..
```

#### 4.2 构建 Release APK
```bash
# 进入 android 目录
cd android

# 构建 release APK
./gradlew assembleRelease

# APK 输出位置:
# android/app/build/outputs/apk/release/app-release.apk
```

#### 4.3 构建 Release AAB (推荐)
```bash
# 构建 Android App Bundle (Google Play 需要)
./gradlew bundleRelease

# AAB 输出位置:
# android/app/build/outputs/bundle/release/app-release.aab
```

#### 4.4 从项目根目录构建
```bash
# 构建 APK
npx react-native build-android --mode=release

# 或
npm run android -- --mode=release
```

### 步骤 5: 验证 APK/AAB

#### 5.1 验证 APK
```bash
# 检查 APK 签名
apksigner verify --verbose android/app/build/outputs/apk/release/app-release.apk

# 查看 APK 信息
aapt dump badging android/app/build/outputs/apk/release/app-release.apk
```

#### 5.2 验证 AAB
```bash
# 使用 bundletool 验证
bundletool validate-bundle \
  --bundle=android/app/build/outputs/bundle/release/app-release.aab
```

### 步骤 6: 上传到 Google Play

#### 6.1 创建 Google Play 账号
1. 注册 [Google Play Console](https://play.google.com/console/)
2. 支付一次性注册费 $25
3. 完成开发者资料

#### 6.2 创建应用
1. 点击 "创建应用"
2. 填写应用名称 (碰一碰组队)
3. 选择默认语言 (简体中文)
4. 确认应用类型

#### 6.3 填写应用信息
- 简短描述 (80 字符)
- 详细描述 (4000 字符)
- 应用图标 (512x512)
- 功能图形 (1024x500)
- 截图 (手机、平板)
- 隐私政策 URL

#### 6.4 上传 AAB
1. 选择 "发布" → "生产"
2. 创建新版本
3. 上传 app-release.aab
4. 填写版本说明
5. 保存并审查

#### 6.5 提交审核
1. 完成内容分级问卷
2. 确认目标受众
3. 提交审核 (通常 1-3 天)

### Android 打包快速命令

```bash
# 完整打包流程
cd nfc-teamup-app
npm install

# 清理
cd android && ./gradlew clean && cd ..

# 构建 APK
cd android && ./gradlew assembleRelease && cd ..

# 构建 AAB
cd android && ./gradlew bundleRelease && cd ..

# 验证签名
apksigner verify --verbose android/app/build/outputs/apk/release/app-release.apk
```

---

## ❓ 常见问题

### iOS 常见问题

#### 1. Archive 失败: "No signing certificate found"

**解决方案**:
```bash
# 1. 检查证书是否安装
security find-identity -v -p codesigning

# 2. 在 Xcode 中重新登录账号
Xcode → Preferences → Accounts → 重新登录

# 3. 重新下载描述文件
# 在 Apple Developer 网站重新下载并安装
```

#### 2. CocoaPods 安装失败

**解决方案**:
```bash
# 1. 更新 CocoaPods
sudo gem install cocoapods

# 2. 清理 Pods
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
pod install

# 3. 如遇权限问题
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
```

#### 3. 构建时出现 "Undefined symbol" 错误

**解决方案**:
```bash
# 1. 清理构建缓存
cd ios
xcodebuild clean
cd ..

# 2. 重新安装依赖
rm -rf node_modules
npm install
cd ios && pod install && cd ..

# 3. 删除 DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData/*
```

#### 4. App 启动后白屏

**解决方案**:
```bash
# 1. 检查 Metro bundler 是否运行
npx react-native start

# 2. 清理缓存
npx react-native start --reset-cache

# 3. 检查 Info.plist 配置
# 确保 NSAppTransportSecurity 配置正确
```

#### 5. 上传失败: "ITMS-90xxx" 错误

**常见错误码**:
- ITMS-90046: 签名无效 → 重新生成证书
- ITMS-90125: 二进制文件无效 → 重新 Archive
- ITMS-90562: 缺少图标 → 添加所有尺寸图标

### Android 常见问题

#### 1. 构建失败: "SDK location not found"

**解决方案**:
```bash
# 1. 在 local.properties 中指定 SDK 路径
echo "sdk.dir=/Users/yourname/Library/Android/sdk" > android/local.properties

# 2. 或在环境变量中设置
export ANDROID_HOME=/Users/yourname/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

#### 2. 签名失败: "Keystore was tampered with, or password was incorrect"

**解决方案**:
```bash
# 1. 确认密码正确
# 2. 重新生成密钥库
keytool -genkeypair -v \
  -keystore nfcteamup-release.keystore \
  -alias nfcteamup \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

#### 3. 构建失败: "Execution failed for task ':app:mergeDexRelease'"

**解决方案**:
```bash
# 1. 启用 multidex
# android/app/build.gradle
defaultConfig {
    multiDexEnabled true
}

# 2. 添加 multidex 依赖
dependencies {
    implementation 'androidx.multidex:multidex:2.0.1'
}

# 3. 清理并重建
cd android && ./gradlew clean && ./gradlew bundleRelease
```

#### 4. APK 安装失败: "App not installed"

**解决方案**:
```bash
# 1. 检查签名是否一致
# 2. 卸载旧版本
adb uninstall com.nfcteamup.app

# 3. 重新安装
adb install android/app/build/outputs/apk/release/app-release.apk
```

#### 5. 构建失败: "Could not resolve all files"

**解决方案**:
```bash
# 1. 清理 Gradle 缓存
cd android
./gradlew cleanBuildCache

# 2. 删除 .gradle 目录
rm -rf ~/.gradle/caches/

# 3. 检查网络连接
# 4. 配置国内镜像
# android/build.gradle
repositories {
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/public' }
}
```

### 通用常见问题

#### 1. Metro Bundler 启动失败

**解决方案**:
```bash
# 1. 清理缓存
npx react-native start --reset-cache

# 2. 删除 node_modules 重新安装
rm -rf node_modules
npm install

# 3. 检查端口占用
lsof -i :8081
kill -9 <PID>
```

#### 2. TypeScript 类型错误

**解决方案**:
```bash
# 1. 检查 TypeScript 配置
npx tsc --noEmit

# 2. 更新类型定义
npm install --save-dev @types/react @types/react-native

# 3. 清理 TypeScript 缓存
rm -rf node_modules/.cache
```

#### 3. 依赖冲突

**解决方案**:
```bash
# 1. 查看依赖树
npm ls

# 2. 解决冲突
npm install <package>@<version> --save

# 3. 使用 resolutions (yarn)
# package.json
"resolutions": {
  "<package>": "<version>"
}
```

#### 4. 构建速度慢

**优化方案**:
```bash
# 1. 启用 Gradle 守护进程
# android/gradle.properties
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.caching=true

# 2. 增加 Gradle 内存
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=1024m

# 3. 使用 Build Cache
npx react-native build-android --mode=release
```

---

## ✅ 发布检查清单

### 发布前检查

#### 代码质量
- [ ] 所有测试通过 (`npm test`)
- [ ] 代码覆盖率 > 80%
- [ ] ESLint 无错误 (`npm run lint`)
- [ ] TypeScript 无类型错误 (`npx tsc --noEmit`)
- [ ] 移除所有 console.log
- [ ] 移除调试代码

#### 功能测试
- [ ] 登录/注册功能正常
- [ ] 创建/加入队伍功能正常
- [ ] 聊天功能正常
- [ ] 位置共享功能正常
- [ ] 文件上传功能正常
- [ ] NFC 功能正常
- [ ] 退出/解散队伍功能正常

#### 性能测试
- [ ] 冷启动时间 < 3s
- [ ] 首屏加载时间 < 2s
- [ ] 列表滚动 FPS > 55
- [ ] 内存占用 < 150MB
- [ ] 无内存泄漏

#### UI/UX 测试
- [ ] 所有页面布局正常
- [ ] 动画流畅
- [ ] 错误提示友好
- [ ] 加载状态显示
- [ ] 适配不同屏幕尺寸

#### 安全测试
- [ ] 敏感信息加密存储
- [ ] API 请求使用 HTTPS
- [ ] 用户输入验证
- [ ] 防止 SQL 注入
- [ ] 防止 XSS 攻击

### iOS 发布检查

- [ ] App Icon 所有尺寸完整
- [ ] 启动屏配置正确
- [ ] Bundle ID 正确
- [ ] 版本号正确
- [ ] 证书和描述文件有效
- [ ] Archive 成功
- [ ] 上传到 App Store Connect
- [ ] 填写应用信息完整
- [ ] 截图符合要求
- [ ] 隐私政策 URL 有效

### Android 发布检查

- [ ] 应用图标所有尺寸完整
- [ ] 启动屏配置正确
- [ ] 包名正确
- [ ] 版本号正确
- [ ] 签名密钥安全保存
- [ ] AAB 构建成功
- [ ] 上传到 Google Play
- [ ] 填写应用信息完整
- [ ] 截图符合要求
- [ ] 隐私政策 URL 有效

### 发布后检查

- [ ] 监控崩溃率
- [ ] 收集用户反馈
- [ ] 查看应用商店评价
- [ ] 监控性能指标
- [ ] 准备热修复方案

---

## 📞 技术支持

### 官方文档
- [React Native 文档](https://reactnative.dev/)
- [Apple Developer](https://developer.apple.com/)
- [Google Play Console](https://support.google.com/googleplay/android-developer)

### 社区资源
- [React Native GitHub](https://github.com/facebook/react-native)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
- [React Native 中文网](https://reactnative.cn/)

### 项目联系方式
- **项目负责人**: 大鲨鱼
- **技术负责人**: 慕容婉儿 🌸
- **邮箱**: 164063721@qq.com

---

**文档维护**: 前端开发特工  
**最后更新**: 2026-03-28  
**文档版本**: v1.0
