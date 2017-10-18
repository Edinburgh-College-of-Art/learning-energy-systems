<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $appQuestion->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $appQuestion->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List App Questions'), ['action' => 'index']) ?></li>
    </ul>
</div>
<div class="appQuestions form large-10 medium-9 columns">
    <?= $this->Form->create($appQuestion) ?>
    <fieldset>
        <legend><?= __('Edit App Question') ?></legend>
        <?php
            echo $this->Form->input('app_school_id');
            echo $this->Form->input('question');
            echo $this->Form->input('answer');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>
