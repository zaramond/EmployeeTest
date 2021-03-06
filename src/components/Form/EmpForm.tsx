import React, { SetStateAction, Dispatch } from 'react'
import { Form, Field } from 'react-final-form'
import styles from './Form.module.css'
import { EmployeeType } from '../../redux/types';
import * as tools from '../../tools/createUpdateTools'


interface SortByNameType {
  name: string,
}

interface SortByBitrhdayType {
  birthday: string,
}

interface FilterFromType {
  role?: string,
  isArchive?: boolean
}

interface EmpFormProps {
  setShownEmployees: Dispatch<SetStateAction<EmployeeType[]>>
  employees: EmployeeType[],
}

export default function EmpForm({ setShownEmployees, employees }: EmpFormProps) {
  
  const onSortByName = (sortByNameValue: SortByNameType): void => {
    console.log(sortByNameValue)
    if (sortByNameValue.name === 'default') {
      setShownEmployees(employees)
    } else if (sortByNameValue.name === 'fromStart') {
      setShownEmployees(state => {
        const clone: EmployeeType[] = [...state]
        return clone.sort((a, b): number => {
          const firstName = a.name.toLowerCase()
          const secondName = b.name.toLowerCase()
          if (firstName > secondName) {
            return 1
          }
          if (firstName < secondName) {
            return -1
          }
          return 0
        })
      })
    } else if (sortByNameValue.name === 'fromEnd') {
      setShownEmployees(state => {
        const clone: EmployeeType[] = [...state]
        return clone.sort((a, b): number => {
          const firstName = a.name.toLowerCase()
          const secondName = b.name.toLowerCase()
          if (firstName > secondName) {
            return -1
          }
          if (firstName < secondName) {
            return 1
          }
          return 0
        })
      })
    }
  };

  const onSortByBitrhday = (sortByBitrhdayValue: SortByBitrhdayType): void => {
    if (sortByBitrhdayValue.birthday === 'default') {
      setShownEmployees(employees)
    } else if (sortByBitrhdayValue.birthday === 'youngest') {
      setShownEmployees(state => {
        const clone: EmployeeType[] = [...state]
        return clone.sort((a, b): number => {
          const firstPersonBirthday = tools.formatDateForInput(a.birthday)
          const secondPersonBirthday = tools.formatDateForInput(b.birthday)
          if (firstPersonBirthday > secondPersonBirthday) {
            return -1
          }
          if (firstPersonBirthday < secondPersonBirthday) {
            return 1
          }
          return 0
        })
      })
    } else if (sortByBitrhdayValue.birthday === 'oldest') {
      setShownEmployees(state => {
        const clone: EmployeeType[] = [...state]
        return clone.sort((a, b): number => {
          const firstPersonBirthday = tools.formatDateForInput(a.birthday)
          const secondPersonBirthday = tools.formatDateForInput(b.birthday)
          if (firstPersonBirthday > secondPersonBirthday) {
            return 1
          }
          if (firstPersonBirthday < secondPersonBirthday) {
            return -1
          }
          return 0
        })
      })
    }
  };

  const onFilterSubmit = (filter: FilterFromType): void => {
      setShownEmployees(() => {
        let filterResult: EmployeeType[] = [...employees];
        for (let key in filter) {
          filterResult = filterResult.filter((emp) => emp[key as keyof FilterFromType]=== filter[key as keyof FilterFromType]);
        }
        return filterResult;
      })
  }

  const onResetClick = () => {
    setShownEmployees(employees)
  }

  return (
      <>
        <div>
          <div>
            <h4>?????????????????????????? ??????????????????????</h4>
            <Form
            onSubmit={onSortByName}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onChange={handleSubmit}>
                    <div className={styles.filterContainer}>
                      <label>???? ??????????</label>
                      <Field name="name" component="select">
                          <option value='default'>???? ??????????????????</option>
                          <option value='fromStart'>??-??</option>
                          <option value='fromEnd'>??-??</option>
                      </Field>
                    </div>
                </form>
            )} />
            <Form
            onSubmit={onSortByBitrhday}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onChange={handleSubmit}>
                    <div className={styles.filterContainer}>
                      <label>???? ????????????????</label>
                      <Field name="birthday" component="select">
                          <option value='default'>???? ??????????????????</option>
                          <option value='youngest'>????????????????</option>
                          <option value='oldest'>????????????????</option>
                      </Field>
                    </div>
                </form>
            )} />
          </div>
          <div>
            <h4>?????????????????????????? ??????????????????????</h4>
            <Form
            onSubmit={onFilterSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                      <label>??????????????????</label>
                      <Field name="role" component="select">
                        <option/>
                        <option value='cook'>??????????</option>
                        <option value='waiter'>????????????????</option>
                        <option value='driver'>????????????????</option>
                      </Field>
                    </div>
                    <div>
                      <label>????????????</label>
                      <Field
                          name="isArchive"
                          component="input"
                          type="checkbox"
                      />?? ????????????
                    </div>
                    <div>
                      <button type="submit" disabled={submitting}>
                        ??????????????????????????
                      </button>
                      <button
                      type="button"
                      onClick={onResetClick}
                      >
                        ????????????????
                      </button>
                    </div>
                </form>
            )} />
          </div>
        </div>
      </>
  )
}
