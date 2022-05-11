import avatar from '../imgs/avatar.jpg';
import '../css/style.css';

const img = new Image();
img.src = avatar;
img.onload = () => {
    document.body.appendChild(img)
}