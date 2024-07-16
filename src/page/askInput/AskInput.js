import { useState, useEffect, useRef } from 'react';
import styles from './AskInput.module.scss';
import classNames from 'classnames/bind';
import MarkDown from '~/components/MarkDown';
import Button from '~/components/button';
import Input from '~/components/editor';
import useTitle from '~/hook/useTitle';
import Model from '~/components/model/Model';
import { IoIosClose } from 'react-icons/io';
import TopicInput from '~/components/topicInput';
import { questionService } from '~/services';
import { useNavigate, useParams } from 'react-router-dom';
import isConfictAuthor from '~/helper/isConflictAuthor';
const cx = classNames.bind(styles);
function AskInput() {
    useTitle('Ask');
    const [content, setContent] = useState('');
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();
    function handleEditorChange({ text }) {
        setContent(text);
    }
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        if (!!id) {
            const fetchAPI = async () => {
                const result = await questionService.getById(id);
                if (isConfictAuthor(result?.author?.id)) {
                    alert('You are not author!');
                    navigate('/search');
                    return;
                }
                setContent(result.content);

                let resetTopics = result.topics.map((topic) => topic.name);
                setTopics(resetTopics);
            };

            try {
                fetchAPI();
            } catch (err) {
                console.log(err);
            }
        }
    }, [id]);
    const renderHTML = (text) => {
        return <MarkDown text={text} />;
    };

    const handleSubmit = async () => {
        const data = { content, topics };
        let result;
        if (!!id) {
            result = await questionService.update(id, data);
        } else {
            result = await questionService.create(data);
        }

        console.log(result);
        if (result?.code) {
            alert(result.message);
        } else {
            navigate(`/question/${result?.id}`);
        }
    };

    const handleDeleteTag = (name) => {
        const newTags = topics.filter((t) => t !== name);
        setTopics(newTags);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h3 className={cx('title')}>Câu hỏi của bạn là gì ?</h3>
                <div className={cx('editor')}>
                    <Input
                        className={cx('input')}
                        content={content}
                        handleEditorChange={handleEditorChange}
                        renderHTML={renderHTML}
                        placeholder="Viet cau hoi cua ban o day"
                    />
                </div>
            </div>
            <TopicInput
                title="Thêm tối đa 5 topics :"
                topics={topics}
                setTopics={setTopics}
                handleDeleteTag={handleDeleteTag}
            />
            <div className={cx('footer')}>
                <Button className={cx('submit-btn')} large primary onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default AskInput;
