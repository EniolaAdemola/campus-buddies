interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

const StepCard = ({ step, title, description }: StepCardProps) => {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
        {step}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-xs mx-auto">{description}</p>
    </div>
  );
};

export default StepCard;