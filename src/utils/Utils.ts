import moment from "moment/moment"

moment.suppressDeprecationWarnings = true

function validateAge(birthday) {
  const today = moment()
  const formateDate = moment(today).format('YYYY/MM/DD')
  const validate = moment(formateDate).diff(birthday, 'years')

  if (validate < 18) {
    throw new Error('O usuário deve ter mais de 18 anos!')
  }

  return true
}

export default validateAge