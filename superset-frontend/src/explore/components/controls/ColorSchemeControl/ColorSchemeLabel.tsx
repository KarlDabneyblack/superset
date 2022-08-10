import { css, SupersetTheme } from '@superset-ui/core';
import React, { useRef, useState } from 'react';
import { Tooltip } from 'src/components/Tooltip';

type ColorSchemeLabelProps = {
  colors: string[];
  id: string;
  label: string;
};

export default function ColorSchemeLabel(props: ColorSchemeLabelProps) {
  const { id, label, colors } = props;
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const labelNameRef = useRef<HTMLElement>(null);
  const labelColorsRef = useRef<HTMLElement>(null);
  const handleShowTooltip = () => {
    const labelNameElement = labelNameRef.current;
    const labelColorsElement = labelColorsRef.current;
    if (
      labelNameElement &&
      labelColorsElement &&
      (labelNameElement.scrollWidth > labelNameElement.offsetWidth ||
        labelNameElement.scrollHeight > labelNameElement.offsetHeight ||
        labelColorsElement.scrollWidth > labelColorsElement.offsetWidth ||
        labelColorsElement.scrollHeight > labelColorsElement.offsetHeight)
    ) {
      setShowTooltip(true);
    }
  };
  const handleHideTooltip = () => {
    setShowTooltip(false);
  };

  const colorsList = () =>
    colors.map((color: string, i: number) => (
      <span
        data-test="color"
        key={`${id}-${i}`}
        css={(theme: { gridUnit: number }) => css`
          padding-left: ${theme.gridUnit / 2}px;
          :before {
            content: '';
            display: inline-block;
            background-color: ${color};
            border: 1px solid ${color === 'white' ? 'black' : color};
            width: 9px;
            height: 10px;
          }
        `}
      />
    ));

  const tooltipContent = () => (
    <>
      <span>{label}</span>
      <div>{colorsList()}</div>
    </>
  );

  return (
    <Tooltip
      data-testid="tooltip"
      title={tooltipContent}
      key={id}
      visible={showTooltip}
    >
      <span
        title={label}
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <span
          ref={labelNameRef}
          css={css`
            min-width: 80px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          `}
        >
          {label}
        </span>
        <span
          ref={labelColorsRef}
          css={(theme: SupersetTheme) => css`
            padding-left: ${theme.gridUnit}px;
            min-width: 150px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          `}
        >
          {colorsList()}
        </span>
      </span>
    </Tooltip>
  );
}
