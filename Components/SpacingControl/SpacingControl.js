import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Devices from '../Devices/Devices';
import './SpacingControl.scss';

const SpacingControl = (props) => {
	const { label, value, onChange = () => { }, defaultVal, units, sides, style, className = '', disableUnits = false, responsive = false } = props;
	const [link, setLink] = useState(true);
	const [device, setDevice] = useState("desktop");

	const unitSides = sides || ['top', 'right', 'bottom', 'left'];

    const getParsedValue = (val) => {
        if (!val) return { top: '', right: '', bottom: '', left: '' };
        if (typeof val === 'object' && !val.desktop && !val.tablet && !val.mobile) return { top: val.top || '', right: val.right || '', bottom: val.bottom || '', left: val.left || '' };
        if (typeof val === 'string') {
            const parts = val.split(' ').map(p => p.trim()).filter(Boolean);
            if (parts.length === 1) return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
            if (parts.length === 2) return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
            if (parts.length === 3) return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] };
            if (parts.length === 4) return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] };
        }
        return { top: '', right: '', bottom: '', left: '' };
    };

    const parsedDefault = getParsedValue(defaultVal);
    const currentValueToParse = responsive ? value?.[device] : value;
    const currentVal = currentValueToParse ? getParsedValue(currentValueToParse) : parsedDefault;

	const isReset = currentValueToParse !== undefined && currentValueToParse !== '' && 
      (currentVal.top !== parsedDefault.top || 
       currentVal.right !== parsedDefault.right || 
       currentVal.bottom !== parsedDefault.bottom || 
       currentVal.left !== parsedDefault.left);

	const defaultUnits = [
		{ label: 'px', value: 'px' },
		{ label: '%', value: '%' },
		{ label: 'em', value: 'em' },
		{ label: 'rem', value: 'rem' },
		{ label: 'vw', value: 'vw' },
		{ label: 'vh', value: 'vh' },
	];

	const handleChange = (val, dimension) => {
        let newVal;
		if (link) {
			newVal = { top: val, right: val, bottom: val, left: val };
		} else {
			if (sides) {
				newVal = dimension === 'horizontal' ? { ...currentVal, right: val, left: val } : (dimension === 'vertical' ? { ...currentVal, top: val, bottom: val } : { ...currentVal, [dimension]: val });
			} else {
				newVal = { ...currentVal, [dimension]: val };
			}
		}

        const t = newVal.top || '';
        const r = newVal.right || '';
        const b = newVal.bottom || '';
        const l = newVal.left || '';

        let finalStr;
        if (!t && !r && !b && !l) {
            finalStr = undefined;
        } else {
            finalStr = `${t || '0px'} ${r || '0px'} ${b || '0px'} ${l || '0px'}`;
        }

        if (responsive) {
            onChange({ ...(typeof value === "object" ? value : {}), [device]: finalStr });
        } else {
            onChange(finalStr);
        }
	}

	const handleReset = () => {
        if (responsive) {
            onChange({ ...(typeof value === "object" ? value : {}), [device]: undefined });
        } else {
            onChange(undefined);
        }
    };

	return (
        <div style={{ ...style }} className={`bPlBoxControl ${className}`}>
            <div className="tr-spacing-control-header">
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {label && <span className="tr-spacing-control-label">{label}</span>}
                    {responsive && <Devices device={device} onChange={setDevice} />}
                </div>
                {isReset && (
                    <button className='tr-spacing-reset-btn' onClick={handleReset} title={__('Reset', 'guten-builder-blocks')}>
                        <span className='dashicons dashicons-image-rotate'></span>
                    </button>
                )}
            </div>

            <div className={`sides ${sides && sides.includes('horizontal', 'vertical') ? 'gap' : ''}`}>
                {unitSides.map((val, i) => (
                    <div className='bplUnitControlWrapper' key={i}>
                        <UnitControl
                            className="tr-custom-unit-control"
                            onChange={(v) => handleChange(v, val)}
                            value={sides ? (val === 'horizontal' ? currentVal?.right : (val === 'vertical' ? currentVal?.top : currentVal?.[val])) : currentVal?.[val]}
                            units={units || defaultUnits}
                            disableUnits={disableUnits}
                        />
                        <div className='sideLabel'>{val}</div>
                    </div>
                ))}

                {!sides && (
                    <button className={`bplBoxControlLinkButton ${link ? 'activeLink' : ''}`} onClick={() => setLink(!link)}>
                        {link ? <span className='dashicons dashicons-admin-links'></span> : <span className='dashicons dashicons-editor-unlink'></span>}
                    </button>
                )}
            </div>
        </div>
    );
}
export default SpacingControl;
