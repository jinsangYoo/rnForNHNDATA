// 초기 모습
/*
import React, {createContext, useContext} from 'react'
import type {FC} from 'react'

export type ToggleThemeContextType = {}
const defaultToggleThemeContext = {}
const ToggleThemeContext = createContext<ToggleThemeContextType>(
  defaultToggleThemeContext
)

type ToggleThemeContextProps = {}
export const ToggleThemeProvider: FC<ToggleThemeContextProps> = ({
  children
}) => {
  const value = {}
  return (
    <ToggleThemeContext.Provider value={value}>
      {children}
    </ToggleThemeContext.Provider>
  )
}

export const useToggleTheme = () => {
  const value = useContext(ToggleThemeContext)
  return value
}
*/
// 최종 모습
import React, {createContext, useContext} from 'react'
import type {FC} from 'react'

export type ToggleThemeContextType = {
  toggleTheme: () => void
}

const defaultToggleThemeContext = {
  toggleTheme: () => {}
}
const ToggleThemeContext = createContext<ToggleThemeContextType>(
  defaultToggleThemeContext
)

type ToggleThemeContextProps = {
  toggleTheme: () => void
}
export const ToggleThemeProvider: FC<ToggleThemeContextProps> = ({
  children,
  toggleTheme
}) => {
  const value = {
    toggleTheme
  }
  return (
    <ToggleThemeContext.Provider value={value}>
      {children}
    </ToggleThemeContext.Provider>
  )
}

export const useToggleTheme = () => {
  const {toggleTheme} = useContext(ToggleThemeContext)
  return toggleTheme
}
