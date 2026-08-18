import { __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './SpacingControl.scss';

const SpacingControl = (props) => {
	const { label, value, onChange = () => { }, defaultVal, units, sides, style, className = '', disableUnits = false } = props;
	const [link, setLink] = useState(true);

	const unitSides = sides || ['top', 'right', 'bottom', 'left'];

    const getParsedValue = (val) => {
        if (!val) return { top: '', right: '', bottom: '', left: '' };
        if (typeof val === 'object') return { top: val.top || '', right: val.right || '', bottom: val.bottom || '', left: val.left || '' };
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
    const currentVal = value ? getParsedValue(value) : parsedDefault;

	const isReset = value !== undefined && value !== '' && 
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

        if (!t && !r && !b && !l) {
            onChange(undefined);
        } else {
            onChange(`${t || '0px'} ${r || '0px'} ${b || '0px'} ${l || '0px'}`);
        }
	}

	return (
        <div style={{ ...style }} className={`bPlBoxControl ${className}`}>
            <div className="tr-spacing-control-header">
                {label && <span className="tr-spacing-control-label">{label}</span>}
                {isReset && (
                    <button className='tr-spacing-reset-btn' onClick={() => onChange(undefined)} title={__('Reset', 'guten-builder-blocks')}>
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
