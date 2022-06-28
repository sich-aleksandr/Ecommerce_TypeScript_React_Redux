import { Alert } from 'antd';
import React from 'react';

export const ErrorMassage: React.FC = () => <Alert
      message="Ошибка"
      description="Пожалуйста попробуйте поздже"
      type="error"
      showIcon
    />