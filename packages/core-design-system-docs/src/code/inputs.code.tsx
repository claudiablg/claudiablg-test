import { InputSelect, InputText, InputWrapper, useTreatTheme } from '@newrade/core-react-ui';
import React from 'react';

type Props = {};

export const Inputs: React.FC<Props> = (props) => {
  const { theme, cssTheme } = useTreatTheme();

  return (
    <>
      <InputWrapper>
        <InputText placeholder={'Placeholder'} />
      </InputWrapper>

      <InputWrapper>
        <InputSelect placeholder={'Placeholder'} />
      </InputWrapper>
    </>
  );
};
