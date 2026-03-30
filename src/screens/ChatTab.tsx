import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { colors, fontSize, spacing, borderRadius } from '../theme';
import Avatar from '../components/Avatar';

interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
}

// 模拟消息数据
const mockMessages: Message[] = [
  {
    id: '1',
    userId: 'user_002',
    userName: '张三',
    text: '大家明天早上几点出发？',
    timestamp: '09:23',
    isSelf: false,
  },
  {
    id: '2',
    userId: 'user_001',
    userName: '我',
    text: '我建议 8 点在地铁口集合',
    timestamp: '09:25',
    isSelf: true,
  },
  {
    id: '3',
    userId: 'user_003',
    userName: '李四',
    text: '好的，我带帐篷和睡袋',
    timestamp: '09:28',
    isSelf: false,
  },
  {
    id: '4',
    userId: 'user_004',
    userName: '王五',
    text: '[图片] 路线图已发，全程 12km',
    timestamp: '09:30',
    isSelf: false,
  },
];

export const ChatTab: React.FC = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSend = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: 'user_001',
      userName: '我',
      text: messageText,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  return (
    <View style={styles.container}>
      {/* 消息列表 */}
      <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map(message => (
          <View
            key={message.id}
            style={[styles.message, message.isSelf && styles.messageSelf]}
          >
            {!message.isSelf && (
              <Avatar name={message.userName} size="medium" />
            )}

            <View
              style={[
                styles.bubble,
                message.isSelf ? styles.bubbleSelf : styles.bubbleOther,
              ]}
            >
              <Text style={message.isSelf ? styles.bubbleTextSelf : styles.bubbleTextOther}>
                {message.text}
              </Text>
              <Text
                style={message.isSelf ? styles.timeSelf : styles.timeOther}
              >
                {message.timestamp}
              </Text>
            </View>

            {message.isSelf && (
              <Avatar name={message.userName} size="medium" />
            )}
          </View>
        ))}
      </ScrollView>

      {/* 输入区 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="发消息..."
          placeholderTextColor={colors.text.tertiary}
          value={messageText}
          onChangeText={setMessageText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>📤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.lg,
  },
  message: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-end',
  },
  messageSelf: {
    flexDirection: 'row-reverse',
  },
  bubble: {
    maxWidth: '70%',
    padding: spacing.md,
    borderRadius: borderRadius.card,
    marginHorizontal: spacing.md,
  },
  bubbleOther: {
    backgroundColor: colors.background.primary,
    borderBottomLeftRadius: 4,
  },
  bubbleSelf: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleTextOther: {
    fontSize: fontSize.lg,
    color: colors.text.primary,
    lineHeight: 22,
  },
  bubbleTextSelf: {
    fontSize: fontSize.lg,
    color: colors.background.primary,
    lineHeight: 22,
  },
  timeOther: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    marginTop: 4,
  },
  timeSelf: {
    fontSize: fontSize.xs,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.lg,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: fontSize.lg,
  },
});

export default ChatTab;
