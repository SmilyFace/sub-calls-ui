// utils/callHelpers.ts
import { Call } from '../models/Calls';
import { JSX } from 'react/jsx-runtime';

export const getDisplayTitle = (
  title: string,
  subgenres: string[],
): JSX.Element | string => {
  if (title === 'General call') {
    if (subgenres.length === 0) {
      return title;
    }
    if (subgenres.length === 1) {
      return subgenres[0];
    }
    return (
      <>
        {subgenres[0]}{' '}
        <span className="gray">+ {subgenres.length - 1} more</span>
      </>
    );
  }
  return title;
};

export const getActiveGenres = (call: Call): string => {
  const genres = [];
  if (call.genre.fiction) genres.push('Fiction');
  if (call.genre.nonfiction) genres.push('Nonfiction');
  if (call.genre.poetry) genres.push('Poetry');
  if (call.genre.hybrid) genres.push('Hybrid');
  if (call.genre.multimedia) genres.push('Multimedia');

  const genreList = genres.join(', ') || 'No Genre';

  return call.genreStyle !== 'general'
    ? `${genreList} (${call.genreStyle})`
    : genreList;
};

export const getReadingPeriod = (call: Call): string => {
  const now = new Date();

  const { callPeriod, subWindows } = call.readingPeriod;

  if (callPeriod.alwaysOpen) {
    return 'Always Open';
  }

  if (callPeriod.limited) {
    const validWindows = subWindows.filter((window) => {
      const openDate = window.openDate ? new Date(window.openDate) : null;
      const closeDate = window.closeDate ? new Date(window.closeDate) : null;

      if (openDate && closeDate) {
        return now >= openDate && now <= closeDate;
      }

      if (openDate) {
        return now >= openDate;
      }

      if (closeDate) {
        return now <= closeDate;
      }

      return false;
    });

    if (validWindows.length > 0) {
      const nextWindow = validWindows[0];
      const openDate = nextWindow.openDate
        ? new Date(nextWindow.openDate).toLocaleDateString()
        : 'N/A';
      const closeDate = nextWindow.closeDate
        ? new Date(nextWindow.closeDate).toLocaleDateString()
        : 'N/A';
      return `Open from ${openDate} to ${closeDate}`;
    }

    return 'No period';
  }

  if (callPeriod.recurring) {
    return 'Recurring';
  }

  return call.status;
};

export const getFee = (fee: {
  charges: boolean;
  amount: number;
  currency: string;
}): string => {
  return fee.charges ? `${fee.amount} ${fee.currency}` : 'No Fee';
};

export const getPay = (payment: {
  pays: boolean;
  amount: { exact: boolean; lower: number; upper: number };
  currency: string;
}): string => {
  if (!payment.pays) return 'No Pay';
  const { exact, lower, upper } = payment.amount;
  return exact
    ? `${lower} ${payment.currency}`
    : `${lower}-${upper} ${payment.currency}`;
};

export const isDisabled = (status: string): boolean => {
  return status === 'closed';
};
