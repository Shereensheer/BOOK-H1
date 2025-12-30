import React from 'react';
import type { Props } from '@theme/NavbarItem';
import AuthButton from '@site/src/components/auth/AuthButton';

const CustomAuthButtonNavbarItem: React.FC<Props> = (props) => {
  return <AuthButton />;
};

export default CustomAuthButtonNavbarItem;