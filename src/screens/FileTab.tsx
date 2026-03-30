import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../theme';

type FileTabType = 'all' | 'image' | 'document';

interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'document';
  uploader: string;
  uploadedAt: string;
  size?: string;
}

const mockFiles: FileItem[] = [
  { id: '1', name: '路线图.jpg', type: 'image', uploader: '张三', uploadedAt: '2 小时前' },
  { id: '2', name: '装备清单.png', type: 'image', uploader: '李四', uploadedAt: '3 小时前' },
  { id: '3', name: '集合点.jpg', type: 'image', uploader: '王五', uploadedAt: '昨天' },
  { id: '4', name: '活动流程.docx', type: 'document', uploader: '张三', uploadedAt: '2 小时前', size: '24 KB' },
  { id: '5', name: '预算表.xlsx', type: 'document', uploader: '李四', uploadedAt: '昨天', size: '18 KB' },
];

export const FileTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FileTabType>('all');
  const [files] = useState<FileItem[]>(mockFiles);

  const filteredFiles = files.filter(file => {
    if (activeTab === 'all') return true;
    return file.type === activeTab;
  });

  const imageFiles = filteredFiles.filter(f => f.type === 'image');
  const documentFiles = filteredFiles.filter(f => f.type === 'document');

  const getFileIcon = (type: 'image' | 'document') => {
    return type === 'image' ? '🖼️' : '📄';
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* 上传按钮 */}
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>📤 上传文件</Text>
        </TouchableOpacity>

        {/* 文件分类 Tab */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fileTabs}>
          <TouchableOpacity
            style={[styles.fileTab, activeTab === 'all' && styles.fileTabActive]}
            onPress={() => setActiveTab('all')}
          >
            <Text
              style={[styles.fileTabText, activeTab === 'all' && styles.fileTabTextActive]}
            >
              全部
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fileTab, activeTab === 'image' && styles.fileTabActive]}
            onPress={() => setActiveTab('image')}
          >
            <Text
              style={[styles.fileTabText, activeTab === 'image' && styles.fileTabTextActive]}
            >
              图片
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fileTab, activeTab === 'document' && styles.fileTabActive]}
            onPress={() => setActiveTab('document')}
          >
            <Text
              style={[styles.fileTabText, activeTab === 'document' && styles.fileTabTextActive]}
            >
              文档
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* 图片网格 */}
        {imageFiles.length > 0 && (activeTab === 'all' || activeTab === 'image') && (
          <>
            <Text style={styles.sectionTitle}>图片</Text>
            <View style={styles.fileGrid}>
              {imageFiles.map(file => (
                <TouchableOpacity key={file.id} style={styles.fileItem}>
                  <Text style={styles.fileIcon}>{getFileIcon(file.type)}</Text>
                  <Text style={styles.fileName} numberOfLines={2}>
                    {file.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* 文档列表 */}
        {documentFiles.length > 0 && (activeTab === 'all' || activeTab === 'document') && (
          <>
            <Text style={styles.sectionTitle}>文档</Text>
            <View style={styles.fileList}>
              {documentFiles.map(file => (
                <TouchableOpacity key={file.id} style={styles.fileListItem}>
                  <View style={styles.fileListIcon}>
                    <Text style={styles.fileListIconText}>{getFileIcon(file.type)}</Text>
                  </View>
                  <View style={styles.fileListInfo}>
                    <Text style={styles.fileListName}>{file.name}</Text>
                    <Text style={styles.fileListMeta}>
                      {file.uploader} • {file.uploadedAt} {file.size && `• ${file.size}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* 空状态 */}
        {filteredFiles.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📁</Text>
            <Text style={styles.emptyText}>暂无文件</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  content: {
    padding: spacing.lg,
  },
  uploadButton: {
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderColor: colors.border.light,
    borderStyle: 'dashed',
    borderRadius: borderRadius.card,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  uploadButtonText: {
    fontSize: fontSize.lg,
    color: colors.text.secondary,
  },
  fileTabs: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  fileTab: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  fileTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  fileTabText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  fileTabTextActive: {
    color: colors.background.primary,
    fontWeight: fontWeight.medium,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  fileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  fileItem: {
    width: '30%',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.button,
    padding: spacing.md,
    alignItems: 'center',
  },
  fileIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  fileName: {
    fontSize: fontSize.sm,
    color: colors.text.primary,
    textAlign: 'center',
  },
  fileList: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.card,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  fileListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  fileListIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  fileListIconText: {
    fontSize: 20,
  },
  fileListInfo: {
    flex: 1,
  },
  fileListName: {
    fontSize: fontSize.lg,
    color: colors.text.primary,
    marginBottom: 4,
  },
  fileListMeta: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.text.tertiary,
  },
});

export default FileTab;
