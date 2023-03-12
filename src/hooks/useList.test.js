import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import useList from './useList';

describe('useList ', () => {
  it('should Initial value Assign', () => {
    const { result } = renderHook(() => useList({ initialState: ['React'] }));
    expect(result.current.list).toEqual(['React']);
  });

  it('should Add New List', () => {
    const { result } = renderHook(() => useList({ initialState: ['React'] }));
    act(() => result.current.add('Javascript'));
    expect(result.current.list).toEqual(['React', 'Javascript']);
  });

  it('should Remove List', () => {
    const { result } = renderHook(() => useList({ initialState: ['React', 'Javascript'] }));
    act(() => result.current.remove(0));
    console.log(result.current);
    expect(result.current.list).toEqual(['Javascript']);
  });
});
