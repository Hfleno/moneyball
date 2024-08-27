export const useAmountColorClass = (amount) => {
	if (amount == 0) {
		return 'text-grey-6'
	}
	return amount > 0 ? 'text-positive' : 'text-negative'
}
