import Api from '../components/Api.js';

const apiObject = new Api();

export default class Card {
  constructor(imageData, userId, handleCardClick, handleCardDelete, cardTemplateSelector = '#card-temlate') {
    this._userId = userId;
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;

    this._setImageData(imageData);
  }

  _setImageData(imageData) {
    this._imageData = imageData;
    this._isOwner = this._userId === imageData.owner._id;
    this._isLiked = this._imageData.likes.some((user) => { return user._id === this._userId});
  }

  _handleLikeButton() {
    const apiLikeFunction = this._isLiked ? apiObject.removeLike : apiObject.setLike;
    apiLikeFunction.bind(apiObject)(this._imageData._id)
    .then((data) => {
      this._setImageData(data);
      this._updateLikeStatus();
    })
    .catch((err) => console.log(err));
  }

  _handleCardClickCallback() {
      this._handleCardClick(this._imageData);
  }

  _handleCardDeleteCallback(event) {
    const cardItem = event.target.closest('.card');
    this._handleCardDelete({id: this._imageData._id, element: cardItem});
  }

  _addEventListeners() {
    const cardFullImageButton = this._cardElement.querySelector('.card__full-image-button');
    const cardLikeButton = this._cardElement.querySelector('.card__like-button');

    cardFullImageButton.addEventListener('click', this._handleCardClickCallback.bind(this));
    cardLikeButton.addEventListener('click', this._handleLikeButton.bind(this));

    if (this._isOwner) {
      const deleteButton = this._cardElement.querySelector('.card__delete-button');
      deleteButton.addEventListener('click', this._handleCardDeleteCallback.bind(this));
    }
  }

  _updateLikeStatus() {
    if (this._isLiked) {
      this._cardLikeButton.classList.add('card__like-button_active');
    } else {
      this._cardLikeButton.classList.remove('card__like-button_active');
    }
    this._cardLikeNumber.textContent = this._imageData.likes.length;
  }

  createElement() {
    if (this._cardElement) {
      return this._cardElement;
    }

    this._cardElement = this._cardTemplate.cloneNode(true);

    const imageElement = this._cardElement.querySelector('.card__image');
    const titleElement = this._cardElement.querySelector('.card__title');

    this._cardLikeNumber = this._cardElement.querySelector('.card__like-number');
    this._cardLikeButton = this._cardElement.querySelector('.card__like-button');

    if (this._isOwner) {
      const deleteButton = this._cardElement.querySelector('.card__delete-button');
      deleteButton.classList.add('card__delete-button_active');
    }

    imageElement.src = this._imageData.link;
    imageElement.alt = `Изображение места ${this._imageData.name}`;
    titleElement.textContent = this._imageData.name;
    this._updateLikeStatus();

    this._addEventListeners();

    return this._cardElement;
  }
}
