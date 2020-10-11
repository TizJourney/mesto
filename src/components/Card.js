export default class Card {
  constructor(imageData, isOwner, handleCardClick, handleCardDelete, cardTemplateSelector = '#card-temlate') {
    this._imageData = imageData;
    this._isOwner = isOwner;
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _handleLikeButton() {
    this.classList.toggle('card__like-button_active');
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
    cardLikeButton.addEventListener('click', this._handleLikeButton.bind(cardLikeButton));

    if (this._isOwner) {
      const deleteButton = this._cardElement.querySelector('.card__delete-button');
      deleteButton.addEventListener('click', this._handleCardDeleteCallback.bind(this));
    }
  }

  createElement() {
    if (this._cardElement) {
      return this._cardElement;
    }

    this._cardElement = this._cardTemplate.cloneNode(true);

    const imageElement = this._cardElement.querySelector('.card__image');
    const titleElement = this._cardElement.querySelector('.card__title');
    const cardLikeNumber = this._cardElement.querySelector('.card__like-number');

    if (this._isOwner) {
      const deleteButton = this._cardElement.querySelector('.card__delete-button');
      deleteButton.classList.add('card__delete-button_active');
    }

    imageElement.src = this._imageData.link;
    imageElement.alt = `Изображение места ${this._imageData.name}`;
    titleElement.textContent = this._imageData.name;
    cardLikeNumber.textContent = this._imageData.likes.length;

    this._addEventListeners();

    return this._cardElement;
  }
}
