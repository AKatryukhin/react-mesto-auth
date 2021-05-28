function PopupForSign({
  name,
  title,
  isOpen,
  onClose,
  buttonTitle,
  children,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className='popup__container-sign'>
        <h2 className='popup__title'>{title}</h2>
        <form
          onSubmit={onSubmit}
          className='popup__form'
          name={`${name}_form`}
          noValidate
        >
          {children}
          <button
            className='popup__save'
            type='submit'
            aria-label='Кнопка отправки'
          >
            {buttonTitle}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupForSign;