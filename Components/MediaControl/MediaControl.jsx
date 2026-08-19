import { __ } from '@wordpress/i18n';
import { TextControl, Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import './MediaControl.scss';

const MediaControl = ( {
	label,
	value,
	onChange,
	allowedTypes = [ 'audio' ],
	buttonLabel = __( 'Upload / Select', 'tr-tools' ),
	help
} ) => {
	return (
		<div className="gbb-media-control">
			<TextControl
				label={ label }
				value={ value || '' }
				onChange={ onChange }
				placeholder={ __( 'Paste URL or select file...', 'tr-tools' ) }
				help={ help }
			/>
			<div className="gbb-media-control__actions">
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) => {
							if ( media && media.url ) {
								onChange( media.url );
							}
						} }
						allowedTypes={ allowedTypes }
						value={ value }
						render={ ( { open } ) => (
							<Button
								variant="secondary"
								isSmall
								onClick={ open }
								className="gbb-media-control__upload-btn"
							>
								{ buttonLabel }
							</Button>
						) }
					/>
				</MediaUploadCheck>
				{ value && (
					<Button
						variant="secondary"
						isDestructive
						isSmall
						onClick={ () => onChange( '' ) }
						className="gbb-media-control__remove-btn"
					>
						{ __( 'Remove', 'tr-tools' ) }
					</Button>
				) }
			</div>
		</div>
	);
};

export default MediaControl;
