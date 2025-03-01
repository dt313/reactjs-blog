import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ShareItem.module.scss';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { close } from '~/redux/actions/shareBoxAction';
const cx = classNames.bind(styles);

function ShareItem({ icon, title, onClick }) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(close());
        onClick();
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 1, delay: 0.5 }}
            className={cx('wrapper')}
            onClick={handleClick}
        >
            <span className={cx('icon-wrap')}>{icon}</span>
            <span className={cx('title')}>{title}</span>
        </motion.div>
    );
}

ShareItem.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ShareItem;
