
export type ConversionQuality = 'small' | 'medium' | 'large';

export interface ConversionOptions {
  quality: ConversionQuality;
  excelMode: 'active' | 'all';
  pptLayout: 'single' | 'handout';
  preserveImages: boolean;
}

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  extension: string;
}

export interface ConversionState {
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress: number;
  message: string;
  outputUrl?: string;
  error?: string;
}

export enum FileType {
  DOCX = 'docx',
  XLSX = 'xlsx',
  PPTX = 'pptx',
  UNKNOWN = 'unknown'
}
