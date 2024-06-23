import { profileTag, noBookmarkProfileTag } from '~/config/uiConfig';

export default function setProfileTag(hasBookmark) {
    if (hasBookmark) return profileTag;
    else return noBookmarkProfileTag;
}
