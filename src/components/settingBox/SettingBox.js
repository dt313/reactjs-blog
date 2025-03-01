import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SettingBox.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../button/Button';
import InputForm from '../inputForm';
import { useEffect, useState } from 'react';
import { SpinnerLoader } from '../loading/Loading';

const cx = classNames.bind(styles);

function SettingBox({ content, onClose, onSubmit, large }) {
    const [value, setValue] = useState(content.content);
    const [isDisable, setIsDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');

    useEffect(() => {
        if (value === content.content && content.type !== 'email') {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [value]);

    const handleOnChange = ({ e, externalValue }) => {
        if (externalValue && value !== externalValue) {
            onClose();
            onSubmit(externalValue, true);
        }

        setValue(externalValue || e.target.value);
    };

    const handleSubmit = async () => {
        if (value === content.content && content.type !== 'email') {
            return;
        }

        try {
            setLoading(true);
            await onSubmit(value);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx('wrapper', large && 'large')} onClick={(e) => e.stopPropagation()}>
            <span className={cx('close-icon')} onClick={onClose}>
                <IoClose />
            </span>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h4 className={cx('title')}>{content.headerTitle}</h4>
                    <p className={cx('description')}>{content.headerDescription}</p>
                </div>
                <div className={cx('content-box')}>
                    <InputForm
                        type={content.type}
                        label={content.label}
                        value={value}
                        onChange={handleOnChange}
                        extraDescription={content.extraDescription}
                        errorText={errorText}
                        setErrorText={setErrorText}
                        validate={content.validation}
                    />
                </div>
            </div>

            {!(content.type === 'image' || content.type === 'theme' || content.type === 'primary-color') && (
                <Button primary className={cx('btn')} onClick={handleSubmit} disabled={isDisable || !!errorText}>
                    {!loading ? (content.type === 'email' ? 'Xác nhận' : 'Lưu') : ''}
                    {loading && <SpinnerLoader small />}
                </Button>
            )}
        </div>
    );
}

SettingBox.propTypes = {
    content: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    large: PropTypes.bool,
};

export default SettingBox;
