import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal'
import ActionButton from '../ActionButton'
import { ACTION, SCREEN } from '../../../shop/taxonomy'
import { requestCode, selectContact, setPhone, verifyContact } from '../../../store/shop/shopSlice'

// Подтверждение контакта кодом: и запрос кода, и его отправка — VERIFY_CONTACT
function OtpModal({ open, onClose, title = 'Подтверждение номера', subtitle }) {
  const dispatch = useDispatch()
  const contact = useSelector(selectContact)
  const [code, setCode] = useState('')

  return (
    <Modal open={open} onClose={onClose} screen={SCREEN.POPUP} title={title} subtitle={subtitle}>
      {contact.verified ? (
        <p className="shop-success">Контакт подтверждён.</p>
      ) : (
        <form
          className="shop-form"
          onSubmit={(event) => {
            event.preventDefault()
            dispatch(verifyContact())
          }}
        >
          <label className="shop-field">
            <span>Телефон</span>
            <input
              type="tel"
              value={contact.phone}
              onChange={(event) => dispatch(setPhone(event.target.value))}
              placeholder="+7 (900) 000-00-00"
              required
            />
          </label>

          {contact.codeSent ? (
            <>
              <label className="shop-field">
                <span>Код из СМС</span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="1234"
                  required
                />
              </label>
              <ActionButton
                screen={SCREEN.POPUP}
                action={ACTION.VERIFY_CONTACT}
                slot="submit"
                type="submit"
              />
            </>
          ) : (
            <ActionButton
              screen={SCREEN.POPUP}
              action={ACTION.VERIFY_CONTACT}
              slot="request"
              label="Выслать код"
              onClick={() => dispatch(requestCode())}
            />
          )}
        </form>
      )}
    </Modal>
  )
}

export default OtpModal
