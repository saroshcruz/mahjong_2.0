DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM public.members
    WHERE razorpay_payment_id IS NOT NULL
    GROUP BY razorpay_payment_id
    HAVING COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'Cannot create unique index: duplicate razorpay_payment_id values exist.';
  END IF;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS members_razorpay_payment_id_unique
  ON public.members (razorpay_payment_id)
  WHERE razorpay_payment_id IS NOT NULL;
