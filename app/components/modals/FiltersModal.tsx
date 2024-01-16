"use client";

import useFilterModal from "@/app/hooks/useFilterModal";
import { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../Inputs/Calendar";
import Counter from "../Inputs/Counter";

enum STEPS {
  LOCATION = 0,
  Date = 1,
  INFO = 2,
}

const FiltersModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const filterModal = useFilterModal();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestsCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((prevState: number) => prevState - 1);
  }, [step]);
  const onNext = useCallback(() => {
    setStep((prevState: number) => prevState + 1);
  }, [step]);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );
    setStep(STEPS.LOCATION);
    filterModal.onClose();
    router.push(url);
  }, [
    step,
    filterModal,
    bathroomCount,
    dateRange,
    location,
    guestCount,
    roomCount,
    onNext,
  ]);

  const actionlabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionlabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Where are you going?"
        subtitle="Find the perfect Location"
      />
      <CountrySelect
        value={location}
        onChange={(location) => setLocation(location)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.Date) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="When do you plan to go"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading title="More information" subtitle="Find your perfect place" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming"
          value={guestCount}
          onChange={(value) => setGuestsCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many Bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={filterModal.isOpen}
      onClose={filterModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionlabel}
      secondaryActionLabel={secondaryActionlabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default FiltersModal;
