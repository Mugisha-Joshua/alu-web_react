import React from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';

export default function Footer() {
  return (
    <p>
      Copyright {getFullYear()} - {getFooterCopy(true)}
    </p>
  );
}
