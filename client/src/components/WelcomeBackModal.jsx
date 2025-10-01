import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Play, PlusCircle } from 'lucide-react';

const WelcomeBackModal = ({ isOpen, onResume, onStartNew }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl glass-card p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-secondary"
                >
                  Welcome Back!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-text-muted">
                    You have an interview in progress. Would you like to resume or start a new one?
                  </p>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-text-main hover:bg-slate-600 focus:outline-none"
                    onClick={onStartNew}
                  >
                    <PlusCircle size={16} /> Start New
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 focus:outline-none"
                    onClick={onResume}
                  >
                    <Play size={16} /> Resume Interview
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WelcomeBackModal;