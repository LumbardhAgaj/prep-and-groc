import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import { useNotificationUpdateContext } from 'contexts/notification';
import Root from 'components/Root/Root';
import NotificationToast from './NotificationToast';
import { addSuccessToast } from 'actions/notification';

afterEach(cleanup);

const FakeNotificationToastDispatcher = ({ toastMessage }) => {
  const dispatch = useNotificationUpdateContext();
  return (
    <button
      type="button"
      onClick={() => {
        dispatch(addSuccessToast(toastMessage));
      }}
    >
      Dispatch toast
    </button>
  );
};

const renderComponent = toastMessage => ({
  ...render(
    <Root>
      <FakeNotificationToastDispatcher toastMessage={toastMessage} />
      <NotificationToast />
    </Root>
  )
});

const fakeToastmessage = 'Toast was successfully displayed';

describe('NotificationToast component', () => {
  test('should render toast message when user dispatches a toast', async () => {
    const { getByText } = renderComponent(fakeToastmessage);
    const toastDipatcherButton = getByText('Dispatch toast');
    fireEvent.click(toastDipatcherButton);
    await wait(() => {
      expect(getByText(fakeToastmessage)).toBeInTheDocument();
    });
  });

  test('should close NotificationToast', async () => {
    const { getByText, queryByText } = renderComponent(fakeToastmessage);
    const toastDipatcherButton = getByText('Dispatch toast');
    fireEvent.click(toastDipatcherButton);

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);
    await wait(() => {
      expect(queryByText(fakeToastmessage)).toBeNull();
    });
  });
});
