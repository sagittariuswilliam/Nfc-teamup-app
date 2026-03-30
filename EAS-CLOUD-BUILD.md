# 📦 EAS 云端编译指南

**适用场景**: 本地内存不足（2GB），使用 Expo EAS 云端编译 Android APK

---

## ✅ 已完成配置

- ✅ `eas.json` - EAS 构建配置文件
- ✅ `app.json` - Expo 应用配置（已迁移）

---

## 🚀 开始云端编译

### 步骤 1: 安装 EAS CLI（本地只需这个，不需要完整环境）

```bash
npm install -g eas-cli
```

### 步骤 2: 登录 Expo 账号

```bash
eas login
```

如果没有账号，先注册：https://expo.dev/signup

### 步骤 3: 配置 EAS 项目

```bash
cd /home/admin/.openclaw/workspace/nfc-teamup-app
eas build:configure
```

### 步骤 4: 开始云端编译（生成 APK）

```bash
# 编译预览版 APK（推荐测试用）
eas build --platform android --profile preview

# 或编译生产版 APK
eas build --platform android --profile production
```

---

## 📋 编译选项说明

| 参数 | 说明 |
|------|------|
| `--platform android` | 编译 Android 版本 |
| `--profile preview` | 预览版（适合测试） |
| `--profile production` | 生产版（适合发布） |
| `--local` | 本地编译（不适用，内存不够） |

---

## ⏱️ 编译时间

- **排队时间**: 通常 5-15 分钟（免费账户）
- **编译时间**: 10-20 分钟
- **总耗时**: 约 15-35 分钟

---

## 📥 下载 APK

编译完成后：

1. EAS 会显示下载链接
2. 或访问 https://expo.dev 查看构建历史
3. APK 可直接安装到 Android 手机测试

---

## 💡 注意事项

### NFC 插件兼容性

当前项目使用了 `react-native-nfc-manager`，这是原生模块。

**方案 A**: 使用 **Expo Development Build**（推荐）
```bash
eas build --platform android --profile development
```
这会创建一个包含 NFC 原生模块的自定义 Development Client。

**方案 B**: 如果 EAS 不支持该插件，需要：
1. 使用 **Expo Config Plugin** 创建自定义配置
2. 或改为纯 Expo Go 兼容的方案（但 NFC 功能受限）

### 免费账户限制

- ✅ 免费账户可以使用 EAS Build
- ⚠️ 构建队列可能较长
- ⚠️ 每月有一定免费构建额度

---

## 🔄 后续迭代

修改代码后重新编译：

```bash
# 提交代码变更（如果需要）
git add .
git commit -m "更新内容"

# 重新编译
eas build --platform android --profile preview
```

---

## 📞 需要帮助？

遇到问题时：

1. 查看 EAS 构建日志：https://expo.dev
2. 检查 `eas.json` 配置
3. 确保 `package.json` 依赖完整

---

**下一步**: 主人可以运行 `eas build --platform android --profile preview` 开始云端编译～ 🌸
