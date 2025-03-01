import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './InputForm.module.scss';
import Image from '../image';
import Button from '../button';
import { FaPlus } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '~/helper/images'; // Utility function to get the cropped image
import { userService } from '~/services';
import { tokenUtils } from '~/utils';
import { useDispatch, useSelector } from 'react-redux';
import { changePrimaryColor, changeTheme } from '~/redux/actions/colorAction';
import setError from '~/helper/setError';
import { addToast, createToast } from '~/redux/actions/toastAction';

const cx = classNames.bind(styles);

function InputForm({ label, value, extraDescription, type, onChange, validate, errorText, setErrorText }) {
    const fileRef = useRef(null);
    const [image, setImage] = useState('');
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const dispatch = useDispatch();
    const { theme, primaryColor } = useSelector((state) => state.color);

    useEffect(() => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    }, [image]);

    const handleChangeImage = (e) => {
        const [file] = e.target.files;

        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(image);
        };
    }, [image]);

    const handleSubmitAvatar = async () => {
        try {
            const croppedImageBlob = await getCroppedImg(image, croppedArea);
            const result = await userService.uploadAvatar(tokenUtils.getUserId(), croppedImageBlob);
            const { user } = result.data;
            tokenUtils.setUser(user);
            setImage('');
            const croppedImageUrl = URL.createObjectURL(croppedImageBlob);
            onChange({ externalValue: croppedImageUrl });
        } catch (error) {
            let err = setError(error);
            dispatch(
                addToast(
                    createToast({
                        type: 'error',
                        content: err,
                    }),
                ),
            );
        }
    };

    const toggleTheme = () => {
        dispatch(changeTheme());
    };

    const handleChangePrimaryColor = (color) => {
        dispatch(changePrimaryColor(color));
    };

    const renderInput = () => {
        if (type === 'text' || type === 'email') {
            return (
                <input
                    autoFocus
                    className={cx('input', errorText && 'error-input')}
                    value={value}
                    onChange={(e) => {
                        let error = validate(e.target.value);
                        setErrorText(error);
                        onChange({ e });
                    }}
                />
            );
        }
        if (type === 'textarea') {
            return (
                <textarea
                    autoFocus
                    className={cx('textarea')}
                    value={value}
                    onChange={(e) => {
                        let error = validate(e.target.value);
                        setErrorText(error);
                        onChange({ e });
                    }}
                />
            );
        }
        if (type === 'image') {
            return (
                <div className={cx('img-box')}>
                    {image ? (
                        <div className={cx('preview')}>
                            <h4 className={cx('preview-title')}>Xem trước</h4>
                            <div className={cx('crop-container')}>
                                <Cropper
                                    image={image}
                                    className={cx('cropper')}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    cropShape="round"
                                    showGrid={false}
                                    minZoom={1}
                                    maxZoom={5}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                            <Button className={cx('save-btn')} primary large onClick={handleSubmitAvatar}>
                                Lưu
                            </Button>
                            <Button
                                className={cx('cancel-btn')}
                                primary
                                large
                                onClick={() => {
                                    setImage('');
                                }}
                            >
                                Hủy
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Image className={cx('img')} src={image || value} onClick={() => fileRef.current.click()} />
                            <Button
                                className={cx('btn')}
                                secondary
                                large
                                leftIcon={<FaPlus className={cx('icon')} />}
                                onClick={() => {
                                    fileRef.current.click();
                                }}
                            >
                                Tải ảnh mới lên
                            </Button>

                            <input
                                type="file"
                                hidden
                                onChange={handleChangeImage}
                                accept=".png, .jpg, .jpeg, .gif"
                                ref={fileRef}
                            />
                        </>
                    )}
                </div>
            );
        }

        if (type === 'theme') {
            return (
                <div className={cx('theme-button', [theme])}>
                    <span className={cx('dark-text')}>Dark</span>
                    <div className={cx('switcher')}>
                        <span className={cx('round')} onClick={toggleTheme}></span>
                    </div>
                    <span className={cx('light-text')}>Light</span>
                </div>
            );
        }

        if (type === 'primary-color') {
            return (
                <div className={cx('colors')}>
                    <span
                        className={cx('color', 'orange', primaryColor === 'orange' && 'active')}
                        onClick={() => handleChangePrimaryColor('orange')}
                    ></span>
                    <span
                        className={cx('color', 'accent', primaryColor === 'accent' && 'active')}
                        onClick={() => handleChangePrimaryColor('accent')}
                    ></span>
                    <span
                        className={cx('color', 'yellow', primaryColor === 'yellow' && 'active')}
                        onClick={() => handleChangePrimaryColor('yellow')}
                    ></span>
                    <span
                        className={cx('color', 'blue', primaryColor === 'blue' && 'active')}
                        onClick={() => handleChangePrimaryColor('blue')}
                    ></span>
                    <span
                        className={cx('color', 'magenta', primaryColor === 'magenta' && 'active')}
                        onClick={() => handleChangePrimaryColor('magenta')}
                    ></span>
                </div>
            );
        }
    };

    return (
        <div className={cx('input-form')}>
            {!(type === 'image') && <label className={cx('label')}>{label}</label>}
            {renderInput()}
            {errorText && <p className={cx('error-des')}>{errorText}</p>}
            <p className={cx('extra-des')}>{extraDescription}</p>
        </div>
    );
}

InputForm.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    extraDescription: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    validate: PropTypes.func,
    errorText: PropTypes.string,
    setErrorText: PropTypes.func,
};
export default InputForm;
